import { useState, useEffect, useRef } from 'react';
import { Satellite, X, Send } from 'lucide-react';
import { useChatWidget } from '../hooks/useChatWidget';

// TODO: ajustar título e saudação junto com o prompt do agente no n8n
const TITLE = 'VOY // Transmissão';
const GREETING = 'Sinal recebido. Em que posso ajudar?';

export default function ChatWidget() {
    const { messages, isOpen, isTyping, sendMessage, close, toggle } = useChatWidget();
    const [input, setInput] = useState('');
    const listRef = useRef(null);
    const panelRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll para a última mensagem
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    // Foca o input ao abrir (desktop; em mobile o teclado já cuida disso)
    useEffect(() => {
        if (isOpen && inputRef.current && window.matchMedia('(hover: hover)').matches) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Ancora o painel ao visualViewport para o teclado mobile (iOS Safari)
    // não empurrar o painel inteiro para fora da tela. Mesmo padrão usado
    // no widget da Gabriela.
    useEffect(() => {
        const vv = window.visualViewport;
        if (!vv || !panelRef.current) return;

        const handleResize = () => {
            if (!panelRef.current) return;
            const keyboardOpen = document.documentElement.clientHeight - vv.height > 120;
            const offset = keyboardOpen
                ? document.documentElement.clientHeight - vv.height - vv.offsetTop
                : 0;
            panelRef.current.style.transform = keyboardOpen ? `translateY(-${offset}px)` : '';
        };

        vv.addEventListener('resize', handleResize);
        vv.addEventListener('scroll', handleResize);
        return () => {
            vv.removeEventListener('resize', handleResize);
            vv.removeEventListener('scroll', handleResize);
        };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    return (
        <>
            <button
                type="button"
                className={`chat-fab ${isOpen ? 'chat-fab-open' : ''}`}
                onClick={toggle}
                aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={22} /> : <Satellite size={22} />}
            </button>

            <div
                className={`chat-panel ${isOpen ? 'chat-panel-open' : ''}`}
                ref={panelRef}
                aria-hidden={!isOpen}
            >
                <div className="chat-panel-header">
                    <span className="chat-panel-title">{TITLE}</span>
                    <button type="button" className="chat-panel-close" onClick={close} aria-label="Fechar">
                        <X size={18} />
                    </button>
                </div>

                <div className="chat-panel-messages" ref={listRef}>
                    {messages.length === 0 && (
                        <div className="chat-bubble chat-bubble-agent">{GREETING}</div>
                    )}
                    {messages.map((m) => (
                        <div key={m.id} className={`chat-bubble chat-bubble-${m.role}`}>
                            {m.text}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-bubble chat-bubble-agent chat-bubble-typing">
                            <span />
                            <span />
                            <span />
                        </div>
                    )}
                </div>

                <form className="chat-panel-input" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escreva sua mensagem..."
                        aria-label="Mensagem"
                        autoComplete="off"
                    />
                    <button type="submit" aria-label="Enviar" disabled={!input.trim()}>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </>
    );
}
