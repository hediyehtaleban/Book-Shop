export default  props =>
    {
        if(!props.state.faves)
        {
            props.state.faves = []
        }
      
      let size = props.state.cart.includes(props.book.title)?20 :30
    
      return <c-c style={{width:150,flex:1, minWidth:150,
       position:"relative", borderRadius:6 , margin:"6px",boxShadow:"0px 0px 9px 2px rgba(0,0,0,0.43)"}}>
      <img
      className={global.styles.hoverzoom_nofade}
       src={props.book.imageLinke}
        style={{
          width:"100%",
          height:200,
          objectFit:"fill",
          minWidth:150,
          borderTopLeftRadius:6,
          borderTopRightRadius:6 }}

        onClick={()=>{
          props.state.form = "bookspecs"
          props.state.book = props.book
          props.refresh()
        }}/>
        <f-cc style={{padding:"5px 9", width:"100%",height:40}}>
          <f-12>{props.book.title}</f-12></f-cc>
        <hr style={{width:"90%", opacity:0.2}}/>

        <f-csb style={{width:"100%", padding:"5px 0"}}>

          <img src={props.state.cart.includes(props.book.title)?
          "https://cdn.turing.team/qepal/ok.svg":
          "https://cdn.turing.team/qepal/cart.svg"} 
          style={{height:size, width:30, objectFit:"contain", margin:"0 10px"}}></img>

          
          <c-x style={{direction:"ltr", margin:"0 5px"}}>

            <f-13><del>{(props.book.price as number).toLocaleString("fa-IR")} تومان</del></f-13>
            <f-16>{(props.book.price*0.9 as number).toLocaleString("fa-IR")} تومان</f-16>


          </c-x>



        </f-csb>
        </c-c>
    }