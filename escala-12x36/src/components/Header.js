import React from 'react'

const Header = () => {
  return (
    <div style={styles.header}> {/*Estiliza o container*/}
      <h1 style={styles.title}>Escala 12x36</h1>
    </div>
  )
}


const styles ={
    header:{
    backgroundColor:" #4CAF50",
    padding: "1rem",
    textAlign:"center",
},
title:{
    color: "#fff",
    fontSize:"1.5rem",
    margin:0,
},
};

export default Header;