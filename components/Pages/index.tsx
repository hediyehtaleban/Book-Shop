import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import Block from './Block';





export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "Book collection "


  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />
      {state.form == "bookspecs"?<WindowFloat title="information" onclose={()=>{
        delete state.form
        refresh() 
      }}>
      
        
        <f-c>
          <f-19> name: </f-19>
          <sp-2/>
          <f-19>{state.book.title}</f-19>
        </f-c>

        <f-c>
          <f-19> the author: </f-19>
          <sp-2/>
          <f-19>{state.book.author}</f-19>
        </f-c>

        <f-c>
          <f-19> pages: </f-19>
          <sp-2/>
          <f-19>{state.book.pages }</f-19>
        </f-c>

        <f-c>
          <f-19> Languege: </f-19>
          <sp-2/>
          <f-19>{state.book.language }</f-19>
        </f-c>


        <g-b style={{backgroundColor:"hwb(36 25.88% 62.35% / 0.74)"}} onClick={()=>{
          if(!state.faves)
            {
            state.faves = []
          }
          state.faves.push(state.book.title)
          state.form = null
          refresh()
        }}>
             <img src="https://irmapserver.ir/research/0/heart.png" 
          style={{height:30, width:30, objectFit:"contain"}}/>
          </g-b>



      </WindowFloat>:null}
      <Window title={name}
       style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
      {/* <pre style={{direction: "ltr"}}>{JSON.stringify(props.books, null, 2)}</pre> */}
      <w-cse style={{}}>
        
        {props.books.map(book=>{
          return <Block book = {book}
          state = {state}
          refresh = {refresh} />

        })}
      </w-cse>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
let books = await global.db.collection("books").find({}).toArray()
for(let book of books) {
 
  book.imageLinke = "https://irmapserver.ir/research/ex/books/" + book.imageLink

}

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}