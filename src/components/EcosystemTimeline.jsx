import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { 
    Video, 
    Target, 
    MousePointerClick, 
    GitMerge, 
    Bot, 
    LineChart 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
    {
        id: 1,
        title: "Produção Audiovisual & Branded Content",
        description: "Tudo começa com a narrativa certa. A Produtora Voy estrutura, roteiriza e capta peças audiovisuais de alto padrão cinemático que elevam o posicionamento da sua marca. Criamos filmes publicitários, conteúdo institucional e materiais para redes sociais que capturam a atenção e geram desejo imediato no seu público-alvo. O vídeo é a sua melhor e mais poderosa peça criativa.",
        transition: "O desejo foi criado. Agora, precisamos colocá-lo diante dos olhos certos. ↓",
        icon: Video,
    },
    {
        id: 2,
        title: "Tráfego Pago de Alta Performance",
        description: "Um conteúdo brilhante não pode depender de alcance orgânico. Nossa gestão de tráfego transforma cada view gerada pela produção da Voy em um ativo comercial real. Conectamos o seu filme aos dados de performance, focando estritamente em CAC e Payback. Com testes de fadiga de criativos integrados direto com a produtora, garantimos que o lead seja qualificado desde o primeiro clique.",
        transition: "A atenção foi capturada. Agora, precisamos de um palco para a conversão. ↓",
        icon: Target,
    },
    {
        id: 3,
        title: "Landing Pages de Alta Performance",
        description: "O clique gerado pelo vídeo precisa de um destino que mantenha o nível e a autoridade da sua marca. Projetamos Landing Pages com arquitetura validada por testes A/B, mantendo a identidade visual intacta e eliminando qualquer fricção na decisão de compra. O lead assiste ao filme, clica no anúncio e converte em um ambiente imersivo.",
        transition: "O lead se cadastrou. Agora, a operação precisa responder instantaneamente. ↓",
        icon: MousePointerClick,
    },
    {
        id: 4,
        title: "Automação Operacional (n8n)",
        description: "O vídeo atrai, mas é a automação que sustenta a escala. Eliminamos tarefas manuais e planilhas da sua rotina. Orquestramos todo o fluxo usando o ecossistema n8n: o lead que converteu na Landing Page entra instantaneamente no seu CRM, a equipe de vendas é acionada no WhatsApp e os dados são cruzados. É a sincronização bidirecional que tira o seu time do trabalho braçal.",
        transition: "A infraestrutura está rodando. Agora, garantimos atendimento em tempo real. ↓",
        icon: GitMerge,
    },
    {
        id: 5,
        title: "Agentes de IA Autônomos",
        description: "Transformamos a autoridade do seu conteúdo em conversas qualificadas, 24 horas por dia. Desenvolvemos Agentes de IA com inteligência multimodal e memória contextual profunda. Eles analisam os áudios e vídeos da campanha, tiram dúvidas técnicas, atualizam seu CRM e marcam reuniões de forma autônoma, sempre mantendo o tom de voz exclusivo da sua marca.",
        transition: "A máquina opera sozinha. Agora, olhamos para a expansão do negócio. ↓",
        icon: Bot,
    },
    {
        id: 6,
        title: "Consultoria Estratégica de Funil",
        description: "Com toda a engrenagem (Produção > Tráfego > Conversão > Automação > IA) funcionando, unimos a expertise artística da Voy com a visão técnica de engenharia de dados. Mapeamos o funil completo para diagnosticar onde novas peças de vídeo podem gerar mais impacto e entregamos um roteiro tático para destrancar gargalos operacionais antes de grandes alocações de capital.",
        transition: "Sua máquina de vendas operando no estado da arte. 🚀",
        icon: LineChart,
    }
];

export default function EcosystemTimeline() {
    const containerRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    const manifesto = "Não entregamos apenas uma peça audiovisual. Construímos a infraestrutura completa para que o seu filme publicitário se transforme em uma máquina de aquisição previsível e operando em piloto automático.";

    useEffect(() => {
        if (prefersReducedMotion) {
            gsap.set('.timeline-header', { opacity: 1, y: 0 });
            gsap.set('.fill-word', { opacity: 1 });
            gsap.set('.stack-card', { scale: 1, y: 0, filter: 'none', opacity: 1 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo('.timeline-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
                }
            );

            // Manifesto: palavras preenchem conforme o scroll atravessa o bloco
            gsap.fromTo('.fill-word',
                { opacity: 0.13 },
                {
                    opacity: 1,
                    ease: 'none',
                    stagger: 0.4,
                    scrollTrigger: {
                        trigger: '.section-desc',
                        start: 'top 78%',
                        end: 'bottom 42%',
                        scrub: true,
                    }
                }
            );

            // Sticky stack: card que sai cede o palco escalando e escurecendo
            const cards = gsap.utils.toArray('.stack-card');
            cards.forEach((card, i) => {
                if (i === cards.length - 1) return;
                gsap.to(card, {
                    scale: 0.92,
                    yPercent: -3,
                    filter: 'brightness(0.4)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: 'top bottom',
                        end: 'top 15%',
                        scrub: true,
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section className="timeline-section" ref={containerRef} id="ecossistema">
            <div className="timeline-header">
                <span className="section-subtitle">O Ecossistema Voy</span>
                <h2 className="section-title">Da Captação à Escala</h2>
                <p className="section-desc">
                    {manifesto.split(' ').map((w, i) => (
                        <span key={i}><span className="fill-word">{w}</span>{' '}</span>
                    ))}
                </p>
            </div>

            <div className="stack-wrap">
                {timelineSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                            <div key={step.id} className="stack-card">
                                <span className="stack-ghost-number" aria-hidden="true">{String(step.id).padStart(2, '0')}</span>
                                <div className="timeline-card-content">
                                    <div className="timeline-icon-wrap">
                                        <Icon className="timeline-icon" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="timeline-step-title">
                                        <span className="step-number">Passo {step.id}:</span> {step.title}
                                    </h3>
                                    <p className="timeline-step-desc">{step.description}</p>
                                    <p className="timeline-step-transition">{step.transition}</p>
                                </div>
                            </div>
                    );
                })}
            </div>
        </section>
    );
}