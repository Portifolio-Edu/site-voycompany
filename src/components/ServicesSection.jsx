import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardFlip from './CardFlip';
import { Target, MousePointerClick, LineChart, GitMerge, Bot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
    const sectionRef = useRef(null);

    const voyServices = [
        {
            title: 'Tráfego Pago',
            subtitle: 'O Amplificador de Conteúdo',
            description: 'Conectamos sua produção audiovisual aos dados de performance para garantir que o lead seja qualificado desde o primeiro clique.',
            features: [
                'Gestão focada em CAC e Payback',
                'Testes de fadiga de criativos',
                'Escala focada no retorno real',
            ],
            color: '#22c55e', // Verde Growth
            mainIcon: Target
        },
        {
            title: 'Landing Pages',
            subtitle: 'O Palco do Conteúdo',
            description: 'Projetamos páginas que mantêm a identidade da sua marca e guiam o lead à decisão de compra sem fricção.',
            features: [
                'Design alinhado ao impacto visual',
                'Arquitetura validada por testes A/B',
                'Integração nativa com o seu CRM',
            ],
            color: '#06b6d4', // Ciano
            mainIcon: MousePointerClick
        },
        {
            title: 'Consultoria Estratégica',
            subtitle: 'Visão de Funil Completo',
            description: 'Analisamos sua operação de ponta a ponta, diagnosticando pontos de atrito no seu funil que estão impedindo o crescimento.',
            features: [
                'Mapeamento de funil integrado',
                'Diagnóstico para destrancar gargalos',
                'Validação de estratégias de escala',
            ],
            color: '#6366f1', // Índigo
            mainIcon: LineChart
        },
        {
            title: 'Automação (n8n)',
            subtitle: 'A Engrenagem da Voy',
            description: 'Usamos o n8n para eliminar tarefas repetitivas, integrar sistemas e centralizar dados, liberando seu time para a estratégia.',
            features: [
                'Sincronização bidirecional de dados',
                'Relatórios extraídos automaticamente',
                'Redesign de processos para escala',
            ],
            color: '#eab308', // Amarelo
            mainIcon: GitMerge
        },
        {
            title: 'Agentes de IA',
            subtitle: 'Inteligência Multimodal',
            description: 'Agentes com memória contextual que processam áudio, vídeo e documentos para um atendimento 24/7 com a voz da sua marca.',
            features: [
                'Análise de Áudio, Docs e Imagens',
                'Atualização de CRM autônoma',
                'Memória de longo prazo',
            ],
            color: '#10b981', // Verde Esmeralda
            mainIcon: Bot
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.services-grid > div',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="services-section" ref={sectionRef}>
            <div className="section-header">
                <span className="section-tag">Nossas Soluções</span>
                <h2>Ecossistema VOY</h2>
                <p className="section-subtitle">
                    Muito além de leads. Construímos e operamos toda a infraestrutura necessária para escalar suas vendas com previsibilidade e inteligência.
                </p>
            </div>
            
            <div className="services-grid">
                {voyServices.map((service, idx) => (
                    <CardFlip key={idx} {...service} />
                ))}
            </div>
        </section>
    );
}
