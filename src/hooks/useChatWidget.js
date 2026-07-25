import { useState, useEffect, useCallback, useRef } from 'react';

// ===== CONFIG =====
// Contrato do Brazza Agent: POST { sessionId, message, name, pageUrl, metadata }
// -> { messages: [], sessionId?, buffered? }
const WEBHOOK = 'https://webhook.eduandreazza.site/webhook/voycompany';
// ==================

const SESSION_KEY = 'voy_chat_session';

// Saudacao do widget. Mora aqui (e nao no componente) por dois motivos:
// 1. entra no estado inicial, entao nao some quando o visitante escreve;
// 2. vai no payload como contexto, para o agente saber a que o visitante
//    esta respondendo. Antes ela existia so no front e o agente ficava cego.
export const GREETING = 'Sinal recebido. Em que posso ajudar?';

// Intervalo entre os baloes da resposta. 550ms fixo era rapido demais e
// derrubava a ilusao de que a Juliana esta escrevendo ou verificando algo.
// Agora escala com o tamanho do texto, com teto para nao travar a conversa.
function bubbleDelay(text) {
    return Math.min(600 + String(text || '').length * 12, 2600);
}

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
    // Saudacao entra como mensagem real do agente, nao como render condicional.
    const [messages, setMessages] = useState([
        { role: 'agent', text: GREETING, id: 'greeting' },
    ]);
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
                    // Contexto da abertura: o agente precisa saber que o site ja
                    // perguntou algo, senao a primeira resposta dele ignora a pergunta.
                    greeting: GREETING,
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
            // Delay acumulado: cada balao espera o tempo de leitura do anterior.
            let elapsed = 0;
            incoming.forEach((text, i) => {
                const wait = i === 0 ? 0 : bubbleDelay(incoming[i - 1]);
                elapsed += wait;
                setTimeout(() => {
                    if (!mountedRef.current) return;
                    setMessages((prev) => [...prev, { role: 'agent', text, id: `a-${Date.now()}-${i}` }]);
                }, elapsed);
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
