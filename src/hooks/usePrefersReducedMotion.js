import { useState, useEffect } from 'react';

export function usePrefersReducedMotion() {
    // CORRIGIDO (18/07): estado inicial vinha fixo em false e so era
    // corrigido dentro do useEffect via setState. Pra quem tem reduce
    // motion ligado no SO, isso gera 2 renders (false depois true) logo
    // no boot da pagina. Como o AuroraBackground usa esse valor como
    // dependencia do proprio useEffect, essa segunda renderizacao
    // desmonta e remonta o WebGL inteiro (contexto, shader, listeners)
    // milissegundos depois do primeiro mount. Inicializar o state ja
    // lendo o matchMedia real (lazy initializer) elimina essa segunda
    // rodada: o valor certo ja chega no primeiro render.
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (e) => {
            setPrefersReducedMotion(e.matches);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return prefersReducedMotion;
}
