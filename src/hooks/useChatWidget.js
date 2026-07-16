import { useState, useEffect, useCallback, useRef } from 'react';

// ===== CONFIG =====
// Contrato do Brazza Agent: POST { sessionId, message, name, pageUrl, metadata }
// -> { messages: [], sessionId?, buffered? }
const WEBHOOK = 'https://webhook.eduandreazza.site/webhook/voycompany';
// ==================

const SESSION_KEY = 'voy_chat_session';

function getSessionId() {
    try {
        let id = localStorage.getItem(SESSION_KEY);
        if (!id) {
            id = crypto.randomUUID ? crypto.randomUUID() : `voy-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(SESSION_KEY, id);
        }
        return id;
    } catch {
        return `voy-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
}

function getMetadata() {
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        referrer: document.referrer || '',
        pageTitle: document.title || '',
    };
}

export function useChatWidget() {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const sessionIdRef = useRef(getSessionId());
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        if (!WEBHOOK || WEBHOOK.indexOf('SEU-WEBHOOK') !== -1) {
            console.warn('[voy-chat-widget] configure o WEBHOOK em src/hooks/useChatWidget.js antes de publicar.');
        }
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const sendMessage = useCallback(async (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { role: 'user', text: trimmed, id: `u-${Date.now()}` }]);
        setIsTyping(true);

        try {
            const res = await fetch(WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sessionIdRef.current,
                    message: trimmed,
                    name: '',
                    pageUrl: window.location.href,
                    metadata: getMetadata(),
                }),
            });

            if (!res.ok) throw new Error(`webhook respondeu ${res.status}`);

            const data = await res.json();
            if (!mountedRef.current) return;

            if (data.sessionId) {
                sessionIdRef.current = data.sessionId;
                try { localStorage.setItem(SESSION_KEY, data.sessionId); } catch {}
            }

            const incoming = Array.isArray(data.messages) ? data.messages : [];
            incoming.forEach((text, i) => {
                setTimeout(() => {
                    if (!mountedRef.current) return;
                    setMessages((prev) => [...prev, { role: 'agent', text, id: `a-${Date.now()}-${i}` }]);
                }, i * 550);
            });
        } catch (err) {
            console.error('[voy-chat-widget] falha ao chamar o webhook', err);
            if (mountedRef.current) {
                setMessages((prev) => [...prev, {
                    role: 'agent',
                    text: 'Deu um problema aqui do meu lado. Tenta de novo em instantes ou chama a gente no WhatsApp.',
                    id: `err-${Date.now()}`,
                }]);
            }
        } finally {
            if (mountedRef.current) setIsTyping(false);
        }
    }, []);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((v) => !v), []);

    return { messages, isOpen, isTyping, sendMessage, open, close, toggle };
}
