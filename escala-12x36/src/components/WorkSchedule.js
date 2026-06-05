import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');

  .hotel-app {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    background: linear-gradient(160deg, #1a1209 0%, #2c1f0e 50%, #1a1209 100%);
    min-height: 100vh;
    padding: 48px 40px 60px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hotel-app::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c9a84c, #e8d08a, #c9a84c, transparent);
  }
  .inner-border {
    position: absolute;
    top: 30px; left: 40px; right: 40px; bottom: 40px;
    border: 0.5px solid rgba(201, 168, 76, 0.12);
    border-radius: 8px;
    pointer-events: none;
  }
  .corner { position: absolute; width: 20px; height: 20px; border-color: rgba(201,168,76,0.35); border-style: solid; }
  .corner.tl { top: 36px; left: 46px; border-width: 1px 0 0 1px; }
  .corner.tr { top: 36px; right: 46px; border-width: 1px 1px 0 0; }
  .corner.bl { bottom: 46px; left: 46px; border-width: 0 0 1px 1px; }
  .corner.br { bottom: 46px; right: 46px; border-width: 0 1px 1px 0; }
  .brand { text-align: center; margin-bottom: 36px; position: relative; z-index: 1; }
  .brand-eyebrow {
    font-family: 'Jost', sans-serif;
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 8px;
  }
  .brand-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 38px;
    color: #f5ead4;
    line-height: 1;
    margin: 0 0 6px;
  }
  .brand-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 10px; }
  .brand-divider .line { height: 0.5px; width: 60px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5)); }
  .brand-divider .line.right { background: linear-gradient(90deg, rgba(201,168,76,0.5), transparent); }
  .diamond { width: 5px; height: 5px; background: #c9a84c; transform: rotate(45deg); }
  .form-area { position: relative; z-index: 1; width: 100%; max-width: 380px; }
  .field-group { margin-bottom: 20px; }
  .field-label {
    display: block;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 8px;
    font-weight: 400;
  }
  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(201,168,76,0.3);
    border-radius: 4px;
    padding: 12px 16px;
    color: #f5ead4;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    outline: none;
    transition: border-color 0.3s, background 0.3s;
    box-sizing: border-box;
    color-scheme: dark;
  }
  .field-input:hover { border-color: rgba(201,168,76,0.55); }
  .field-input:focus { border-color: rgba(201,168,76,0.85); background: rgba(255,255,255,0.07); }
  .calc-btn {
    width: 100%;
    padding: 14px;
    background: transparent;
    border: 0.5px solid rgba(201,168,76,0.6);
    color: #c9a84c;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 4px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.3s, color 0.3s, border-color 0.3s;
    margin-top: 8px;
  }
  .calc-btn:hover { background: rgba(201,168,76,0.12); border-color: #c9a84c; }
  .calc-btn:active { transform: scale(0.99); }
  .result-card { margin-top: 28px; padding: 24px; border-radius: 4px; text-align: center; animation: fadeIn 0.5s ease; }
  .result-card.plantao { background: rgba(201,168,76,0.08); border: 0.5px solid rgba(201,168,76,0.4); }
  .result-card.folga { background: rgba(29,158,117,0.08); border: 0.5px solid rgba(29,158,117,0.35); }
  .result-card.erro { background: rgba(226,75,74,0.08); border: 0.5px solid rgba(226,75,74,0.35); }
  .result-eyebrow { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: rgba(245,234,212,0.45); margin-bottom: 6px; }
  .result-main { font-family: 'Jost', sans-serif; font-size: 28px; font-weight: 400; letter-spacing: 0px; }
  .result-card.plantao .result-main { color: #e8d08a; }
  .result-card.folga .result-main { color: #5DCAA5; }
  .result-card.erro .result-main { color: #F09595; font-size: 18px; }
  .result-date { font-size: 12px; color: rgba(245,234,212,0.4); margin-top: 6px; letter-spacing: 1px; }
  .error-msg { font-size: 11px; color: #F09595; letter-spacing: 1px; text-align: center; margin-top: 10px; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const WorkSchedule = () => {
  const [lastShift, setLastShift] = useState('');
  const [queryDate, setQueryDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calcular = () => {
    setError('');
    setResult(null);

    if (!lastShift || !queryDate) {
      setError('Por favor, preencha ambas as datas.');
      return;
    }

    // const d1 = new Date(lastShift + 'T00:00:00');
    // const d2 = new Date(queryDate + 'T00:00:00');
    // const diffHours = (d2 - d1) / (1000 * 60 * 60);

    // if (diffHours < 0) {
    //   setResult({ tipo: 'erro', texto: 'Data inválida', data: 'A data de consulta é anterior ao último plantão.' });
    //   return;
    // }

    // const cycle = diffHours % 48;
    // const isPlantao = cycle >= 0 && cycle < 12;
const d1 = new Date(lastShift + 'T00:00:00');
const d2 = new Date(queryDate + 'T00:00:00');
const diffHours = (d2 - d1) / (1000 * 60 * 60);

if (diffHours < 0) {
  setResult({ tipo: 'erro', texto: 'Data inv\u00e1lida', data: 'A data de consulta \u00e9 anterior ao \u00faltimo plant\u00e3o.' });
  return;
}

const cycle = diffHours % 48;
const isPlantao = cycle < 24;
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dataFormatada = d2.toLocaleDateString('pt-BR', opcoes);

    setResult({
      tipo: isPlantao ? 'plantao' : 'folga',
      texto: isPlantao ? 'Plant\u00e3o' : 'Folga',
      data: dataFormatada,
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hotel-app">
        <div className="inner-border" />
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
        <div className="brand">
          <div className="brand-eyebrow">Gestão de Turnos</div>
          <div className="brand-title">Escala 12×36</div>
          <div className="brand-divider">
            <span className="line" />
            <div className="diamond" />
            <span className="line right" />
          </div>
        </div>
        <div className="form-area">
          <div className="field-group">
            <label className="field-label" htmlFor="lastShift">Último plantão</label>
            <input className="field-input" type="date" id="lastShift" value={lastShift} onChange={(e) => setLastShift(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="queryDate">Data para verificar</label>
            <input className="field-input" type="date" id="queryDate" value={queryDate} onChange={(e) => setQueryDate(e.target.value)} />
          </div>
          <button className="calc-btn" onClick={calcular}>Verificar escala</button>
          {error && <p className="error-msg">{error}</p>}
          {result && (
            <div className={'result-card ' + result.tipo}>
              <div className="result-eyebrow">Situação prevista</div>
              <div className="result-main" spellCheck="false" translate="no">{result.texto}</div>
              <div className="result-date">{result.data}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkSchedule;

