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
const Page: PageEl = (props, state:
  {
    form: string,
    book: {
      title: string, author: string, country: string,
      imageLink: string, price: number,
      language: string, pages: number,

    },
    cart: Array<string>
  }, refresh, getProps) => {

  let styles = global.styles

  let total_price = 0

  if (!state.cart) {
    state.cart = []
  }

  for (let title of state.cart) {
    let book = props.books.find(b => b.title == title)
    if (book) {
      total_price += (book.price * 0.8)
    }
  }

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
          <sp-2/>state
          <f-19>{state.book.pages }</f-19>
        </f-c>

        <f-c>
          <f-19> Languege: </f-19>
          <sp-2/>
          <f-19>{state.book.language }</f-19>
        </f-c>

        <g-b style={{
          backgroundColor:
            state.cart.includes(state.book.title) ? "hwb(0 29.41% 47.45% / 0.77)" : "oklch(0.57 0.07 70.85 / 0.57)"
        }}
          onClick={() => {

            if (state.cart.includes(state.book.title)) {
              state.cart = state.cart.filter(bookname => state.book.title != bookname)
              state.form = null
              refresh()
            }
            else {
              state.cart.push(state.book.title)
              state.form = null
              refresh()
            }

          }}>
          {state.cart.includes(state.book.title) ? <f-13>حذف از سبد خرید</f-13> : <f-13>افزودن به سبد خرید</f-13>}
        </g-b >


      </WindowFloat> : null}

      <Window title="سبد خرید" style={{ margin: 10, width: "calc(100% - 20px)" }} >
        <f-cse style={{
          height: 60, width: "100%"
        }}>
          <f-14>مجموع قابل پرداخت: {total_price.toLocaleString("fa-IR")} تومان</f-14>
          <f-14>تعداد کتاب ها {state.cart.length.toLocaleString("fa-IR")} عدد</f-14>
        </f-cse>
      </Window>
      <Window title={"خوش آمدید"}
        style={{
          minHeight: 200, margin: 10,
          width: "calc(100% - 20px)"
        }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre>
         */}

        <w-cse style={{}}>
          {props.books.map(book => {
            return <Block
              book={book}
              state={state}
              refresh={refresh}
            />
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
 
  book.imageLinke = "https://cdn.turing.team/research/ex/books/" + book.imageLink

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