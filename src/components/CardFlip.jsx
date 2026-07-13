import { useState } from 'react';
import {
    ArrowRight,
    Bot,
    GitMerge,
    MousePointerClick,
    Rocket,
    Target,
    Zap
} from 'lucide-react';

export default function CardFlip({
    title = 'Agentes de IA Autônomos',
    subtitle = 'O Atendimento de Elite',
    description = 'Inteligência multimodal com memória contextual para atualizar CRM, marcar reuniões e atender 24/7 com a voz da sua marca.',
    features = [
        'Multimodalidade (Áudios, Docs e Imagens)',
        'Execução autônoma de tarefas',
        'Memória de longo prazo',
        'Tom de voz exclusivo da empresa',
    ],
    color = '#10b981', // Verde Esmeralda
    ctaText = 'Agendar Diagnóstico',
    mainIcon: MainIcon = Rocket
}) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Seleção de ícones mais adequados para o ecossistema Voy
    const featureIcons = [Target, MousePointerClick, GitMerge, Bot, Zap];

    return (
        <div
            className="card-flip-container"
            style={{ '--primary': color }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`card-flip-inner ${isFlipped ? 'flipped' : ''}`}>
                
                {/* Parte da Frente do Card */}
                <div className="card-flip-front">
                    <div className="card-flip-bg" />
                    
                    {/* Animação Central */}
                    <div className="card-bars-container">
                        <div className="card-bars">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="card-bar"
                                    style={{
                                        width: `${60 + Math.random() * 40}%`,
                                        animationDelay: `${i * 0.2}s`,
                                        marginLeft: `${Math.random() * 20}%`,
                                    }}
                                />
                            ))}

                            <div className="card-icon-wrapper">
                                <div className="card-icon">
                                    <MainIcon size={40} color="#fff" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo Inferior (Frente) */}
                    <div className="card-front-bottom">
                        <div className="card-front-text">
                            <h3 className="card-front-title">{title}</h3>
                            <p className="card-front-subtitle">{subtitle}</p>
                        </div>
                        <div className="card-front-zap">
                            <Zap size={20} />
                        </div>
                    </div>
                </div>

                {/* Parte de Trás do Card (Flipped) */}
                <div className="card-flip-back">
                    <div className="card-flip-bg" />

                    <div className="card-back-content">
                        <div className="card-back-header">
                            <h3 className="card-back-title">{title}</h3>
                            <p className="card-back-desc">{description}</p>
                        </div>

                        <div className="card-features">
                            {features.map((feature, index) => {
                                const IconComponent = featureIcons[index % featureIcons.length];
                                return (
                                    <div
                                        key={index}
                                        className="card-feature"
                                        style={{
                                            transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
                                            opacity: isFlipped ? 1 : 0,
                                            transitionDelay: `${index * 50 + 200}ms`,
                                        }}
                                    >
                                        <div className="card-feature-icon">
                                            <IconComponent size={14} />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="card-cta">
                        <span>{ctaText}</span>
                        <div className="card-cta-icon">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
