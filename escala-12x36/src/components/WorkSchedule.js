import React, { useState } from 'react'

const WorkSchedule = () => {
  const [lastShift, setLastShift] = useState(""); // data do último plantão
  const [queryDate, setQueryDate] = useState(""); // data que será consultada
  const [result, setResult] = useState("") //Resultado(plantão ou folga)

   // Função para calcular a escala
  const calculateShedule = () =>{
    const lastShiftDate = new Date(lastShift); // converte a última data para objeto Date
    const queryDateObject = new Date(queryDate); // converte da consultada para objeto
  
  
   //Calcula a diferença em milissegundos e converte para horas
  const differenceInHours = (queryDateObject - lastShiftDate) / (1000 * 60 *60);

  //O ciclo da escala é de 48h(12 trabalho e 36 folga)
  const cycleHours = differenceInHours % 48;

 // Baseado no ciclo de estiver nas primeiras 12h do ciclo, é plantão, senão, é folga
  if (cycleHours >=0 && cycleHours < 12) {

    setResult("Você estará de PLANTÃO");

    }else{
      setResult("Você estará de FOLGA");
    
    }
    
  };

  return (
    <div style={{padding:"1rem"}}>
      <h2>Calcule sua escala 12x36</h2>

      <label>
        Data do último Plantão:
        <input
          type="date"
          value={lastShift}
          onChange={(e) => setLastShift(e.target.value)}
        />
           
      </label>

      <br/>

    <label>
      Data para verificar:
      <input
        type="date"
        value={queryDate}
        onChange={(e) => setQueryDate(e.target.value)}
      />
    </label>

    <br/>

    <button onClick={calculateShedule}>Calcular</button>

    <h3>{result}</h3>
    </div>
  )
};

export default WorkSchedule;
