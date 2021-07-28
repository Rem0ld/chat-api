
import ctl from "helpers/ctl";


const listChatrooms = ctl(`
flex
flex-col 
h-full
p-4 
space-y-2 
rounded-md 
shadow-inner 
list-none 
overflow-y-scroll
`)

const linksChatrooms = ctl(`
block
w-4/5 
p-2 
rounded-md 
bg-secondary 
text-center 
hover:bg-secondary-hover
`)

const chat = ctl(`
h-screen 
w-3/4 
bg-secondary 
border-l 
border-gray-400
`)

const leftPanel = ctl(`
flex
flex-col
max-h-screen
h-screen 
w-1/4 
px-2 
space-y-2 
bg-tertiary
`)

const rightPanel = ctl(`
h-screen 
w-[15%]
p-1 
bg-tertiary
border-gray-400
border-l
text-white 
font-semibold
`)

const h2title = ctl(`
mb-2
text-xl
text-white 
font-semibold 
`)

export default {
  listChatrooms,
  linksChatrooms,
  chat,
  leftPanel,
  rightPanel,
  h2title
}