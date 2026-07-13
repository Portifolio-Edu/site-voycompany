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
    const lineRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            gsap.set('.timeline-header', { opacity: 1, y: 0 });
            gsap.set(lineRef.current, { height: '100%' });
            gsap.set('.timeline-node', { backgroundColor: "var(--accent)", borderColor: "var(--accent)" });
            gsap.set('.timeline-card', { opacity: 1, x: 0, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.timeline-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );

            // Animate the main central line
            gsap.fromTo(lineRef.current, 
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 70%",
                        scrub: 1,
                    }
                }
            );

            // Animate nodes and cards individually
            const items = gsap.utils.toArray('.timeline-item');
            
            items.forEach((item) => {
                const node = item.querySelector('.timeline-node');
                const card = item.querySelector('.timeline-card');
                
                if (!node || !card) return;

                // Node lights up
                gsap.to(node, {
                    backgroundColor: "var(--accent)",
                    boxShadow: "0 0 20px rgba(0, 255, 204, 0.6)",
                    borderColor: "var(--accent)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 60%",
                        end: "top 40%",
                        scrub: true,
                    }
                });

                const isLeft = item.classList.contains('timeline-left');
                const xOffset = isLeft ? -50 : 50;

                // Card slides in
                gsap.fromTo(card,
                    { opacity: 0, x: xOffset, y: 20 },
                    {
                        opacity: 1, x: 0, y: 0, duration: 0.6,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 75%",
                        }
                    }
                );
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
                    Não entregamos apenas uma peça audiovisual. Construímos a infraestrutura completa para que o seu filme publicitário se transforme em uma máquina de aquisição previsível e operando em piloto automático.
                </p>
            </div>

            <div className="timeline-wrapper">
                {/* Background line track */}
                <div className="timeline-line-bg"></div>
                {/* Foreground animated line */}
                <div className="timeline-line-active" ref={lineRef}></div>

                {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isLeft = index % 2 === 0;

                    return (
                        <div key={step.id} className={`timeline-item ${isLeft ? 'timeline-left' : 'timeline-right'}`}>
                            
                            {/* The dot/node on the central line */}
                            <div className="timeline-node">
                                <div className="timeline-node-inner"></div>
                            </div>

                            <div className="timeline-card">
                                <div className="timeline-card-glow"></div>
                                <div className="timeline-card-content">
                                    <div className="timeline-icon-wrap">
                                        <Icon className="timeline-icon" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="timeline-step-title">
                                        <span className="step-number">Passo {step.id}:</span> {step.title}
                                    </h3>
                                    <p className="timeline-step-desc">
                                        {step.description}
                                    </p>
                                    <p className="timeline-step-transition">
                                        {step.transition}
                                    </p>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}
