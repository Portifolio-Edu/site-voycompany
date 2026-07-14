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
        title: "ESTRATÉGIA",
        description: "Antes de produzir qualquer conteúdo, precisamos entender a sua marca. Analisamos o posicionamento da empresa, o comportamento do público, a linguagem da comunicação, os diferenciais do negócio e os objetivos de crescimento. A partir desse diagnóstico, estruturamos uma estratégia de conteúdo completa, definindo quais formatos serão produzidos, quais mensagens precisam ser transmitidas e como cada peça será utilizada dentro do ecossistema. Produzimos materiais adaptados para diferentes plataformas, incluindo redes sociais, campanhas de performance, posicionamento de marca, relacionamento e conversão. Cada vídeo nasce com uma função específica. Nada é criado por acaso.",
        transition: "A estratégia está definida. Agora é hora de colocar essa mensagem diante das pessoas certas.",
        icon: Video,
    },
    {
        id: 2,
        title: "DISTRIBUIÇÃO",
        description: "Conteúdo de qualidade precisa chegar ao público certo. Estruturamos campanhas de tráfego e distribuição que conectam cada peça produzida ao momento ideal da jornada do consumidor. A comunicação é direcionada para atrair pessoas com real potencial de se tornarem clientes, fortalecendo o posicionamento da marca enquanto gera novas oportunidades comerciais. Criativo, dados e performance trabalham juntos para construir uma prospecção mais eficiente, previsível e escalável.",
        transition: "O público chegou. Agora precisamos transformar interesse em oportunidade.",
        icon: Target,
    },
    {
        id: 3,
        title: "CONVERSÃO",
        description: "Toda campanha precisa de um ambiente preparado para receber a atenção que foi conquistada. Desenvolvemos Landing Pages, funis e estruturas de conversão personalizadas para a realidade de cada negócio. Cada etapa é construída para reduzir objeções, aumentar a percepção de valor e conduzir o visitante até a ação desejada. O resultado é uma experiência fluida, consistente e alinhada com toda a comunicação construída anteriormente.",
        transition: "O interesse virou oportunidade. Agora a operação precisa acompanhar esse crescimento.",
        icon: MousePointerClick,
    },
    {
        id: 4,
        title: "INTEGRAÇÃO",
        description: "Conforme as oportunidades aumentam, a operação precisa responder na mesma velocidade. Conectamos marketing, vendas, atendimento e gestão através de automações inteligentes que eliminam tarefas repetitivas e reduzem falhas operacionais. Leads, informações, notificações e processos passam a circular automaticamente entre os sistemas utilizados pela empresa. Mais organização. Mais velocidade. Mais eficiência operacional.",
        transition: "A estrutura está conectada. Agora ela precisa evoluir continuamente.",
        icon: GitMerge,
    },
    {
        id: 5,
        title: "INTELIGÊNCIA",
        description: "Com toda a operação integrada, criamos um ecossistema capaz de funcionar de forma cada vez mais inteligente. Os Agentes de IA podem apoiar o atendimento, qualificação de leads, organização de informações, atualização de sistemas e diversos processos operacionais. Tudo conectado à identidade da marca, aos objetivos do negócio e às necessidades da equipe. A tecnologia deixa de ser uma ferramenta isolada e passa a atuar como parte da operação.",
        transition: "Agora não existe apenas automação. Existe inteligência aplicada ao crescimento.",
        icon: Bot,
    },
    {
        id: 6,
        title: "CRESCIMENTO",
        description: "Quando estratégia, conteúdo, distribuição, conversão, automação e inteligência trabalham em conjunto, o crescimento deixa de depender de ações isoladas. Os dados se tornam mais claros. As decisões mais precisas. Os investimentos mais eficientes. A empresa passa a evoluir com base em informação, planejamento e execução. Porque crescer não é apenas vender mais.",
        transition: "É construir uma operação preparada para sustentar os próximos níveis do negócio.",
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
                    { opacity: 0, x: xOffset, y: 30 },
                    {
                        opacity: 1, x: 0, y: 0, 
                        duration: 0.85, 
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
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
                <span className="section-subtitle">O Ecossistema VOY</span>
                <h2 className="section-title">Aquecendo os Motores</h2>
                <p className="section-desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    Não produzimos apenas conteúdos.<br/><br/>Construímos uma operação completa onde estratégia, comunicação, tecnologia e performance trabalham conectadas para gerar crescimento de forma consistente.<br/><br/>Cada etapa foi pensada para transformar atenção em oportunidades, oportunidades em relacionamento e relacionamento em resultados.
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
                                        <span className="step-number">ESTÁGIO 0{step.id} •</span> {step.title}
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
