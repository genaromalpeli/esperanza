'use client'

interface Props {
  onCalc: () => void
}

export default function WhyTab({ onCalc }: Props) {
  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '48px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      {/* Page title */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '38px',
            fontWeight: 700,
            color: '#e2e2e2',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          ¿Por qué calcular la{' '}
          <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>esperanza</span>?
        </h1>
      </div>

      {/* 1. Personal story */}
      <div
        style={{
          background: '#141414',
          borderLeft: '3px solid #c9a84c',
          borderRadius: '0 12px 12px 0',
          padding: '24px 28px',
        }}
      >
        <p
          style={{
            margin: '0 0 14px',
            fontSize: '15px',
            lineHeight: 1.75,
            color: '#ccc',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Pasé días perdido. Desganado, sin ver el futuro con claridad. Pero noté algo: cada vez
          que aparecía una idea prometedora, volvía la energía. De repente tenía ganas de levantarme,
          de hablar, de crear.
        </p>
        <p
          style={{
            margin: '0 0 14px',
            fontSize: '15px',
            lineHeight: 1.75,
            color: '#ccc',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Me pregunté qué era eso. Y me di cuenta: era la{' '}
          <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>esperanza</span>. No el optimismo
          ingenuo ni la fe ciega, sino algo más preciso: la percepción de que el futuro podía ser
          mejor si actuaba bien.
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            lineHeight: 1.75,
            color: '#ccc',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Justo estaba leyendo a Laplace. Me pareció hermoso que algo tan humano, tan íntimo,
          tuviera una fórmula. Decidí matematizar mi propia{' '}
          <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>esperanza</span>. No para
          predecir el futuro, sino para entender qué me mueve y para diseñarla.
        </p>
      </div>

      {/* 2. Laplace definition */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#e2e2e2',
            marginBottom: '16px',
          }}
        >
          ¿Qué es la{' '}
          <span style={{ color: '#c9a84c' }}>esperanza</span> según Laplace?
        </h2>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: '#aaa',
            fontFamily: 'var(--font-dm-sans)',
            margin: 0,
          }}
        >
          Laplace la definió como{' '}
          <em style={{ color: '#e2e2e2' }}>
            &ldquo;la ventaja del que espera un bien cualquiera dentro de suposiciones que son solo
            probables&rdquo;
          </em>
          . No es optimismo. No es fe. Es una medida racional de cuánto vale la pena embarcarse en
          algo, dadas las probabilidades y los valores en juego.
        </p>
      </div>

      {/* 3. Equation */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#e2e2e2',
            marginBottom: '20px',
          }}
        >
          La ecuación
        </h2>

        <div
          style={{
            background: '#141414',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '28px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '22px',
              color: '#c9a84c',
              textAlign: 'center',
              marginBottom: '24px',
              letterSpacing: '0.02em',
            }}
          >
            E = Σ P(i)·V(i) − Σ P(j)·C(j)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { sym: 'P(i)', desc: 'Probabilidad de que ocurra el beneficio i (entre 0 y 1).' },
              { sym: 'V(i)', desc: 'Valor subjetivo de ese beneficio (escala 0–100).' },
              { sym: 'P(j)', desc: 'Probabilidad de que ocurra el costo j (entre 0 y 1).' },
              { sym: 'C(j)', desc: 'Magnitud del costo j (escala 0–100).' },
            ].map(({ sym, desc }) => (
              <div key={sym} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-mono)',
                    fontSize: '13px',
                    color: '#c9a84c',
                    width: '44px',
                    flexShrink: 0,
                    paddingTop: '1px',
                  }}
                >
                  {sym}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#888',
                    fontFamily: 'var(--font-dm-sans)',
                    lineHeight: 1.5,
                  }}
                >
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            fontSize: '14px',
            color: '#666',
            fontFamily: 'var(--font-dm-sans)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Los valores son subjetivos. Y eso no los invalida, los hace propios. Nadie más que vos
          sabe cuánto vale para vos algo o cuánto te cuesta un fracaso.
        </p>
      </div>

      {/* 4. Levers */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#e2e2e2',
            marginBottom: '20px',
          }}
        >
          Las 4 palancas para subir E
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              sym: '↑ P(i)',
              title: 'Más información, mejores equipos',
              desc: 'Aumentan la probabilidad de éxito. Cuanto más sabés y mejor te rodeás, más alta es P(i).',
            },
            {
              sym: '↑ V(i)',
              title: 'Elegí proyectos que realmente importen',
              desc: 'Un proyecto que te mueve de verdad tiene un V(i) alto. El valor subjetivo importa.',
            },
            {
              sym: '↓ C(j)',
              title: 'Reducí el costo de intentar',
              desc: 'MVP rápido antes que compromiso largo. Cuanto menos cuesta el intento, más libre sos para apostar.',
            },
            {
              sym: '↑ n',
              title: 'Más apuestas en paralelo',
              desc: 'La ley de los grandes números trabaja a tu favor. Diversificar es una estrategia de esperanza.',
            },
          ].map(({ sym, title, desc }) => (
            <div
              key={sym}
              style={{
                background: '#141414',
                border: '1px solid #222',
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '13px',
                  color: '#c9a84c',
                  width: '44px',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}
              >
                {sym}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#e2e2e2',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#777',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: '28px',
            fontSize: '16px',
            color: '#e2e2e2',
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          La <span style={{ color: '#c9a84c' }}>esperanza</span> no solo se calcula. También se
          diseña.
        </p>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onCalc}
          style={{
            background: '#c9a84c',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'var(--font-dm-sans)',
            cursor: 'pointer',
            letterSpacing: '0.01em',
            transition: 'background 0.15s, transform 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#d4b460'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#c9a84c'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Calculá tu primera esperanza →
        </button>
      </div>
    </div>
  )
}
