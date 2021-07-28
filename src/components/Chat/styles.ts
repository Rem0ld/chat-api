
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
w-4/5 
p-2 
rounded-md 
bg-secondary 
text-center 
hover:bg-secondary-hover
`)

const chat = ctl(`
h-screen 
w-2/4 
px-1 
bg-secondary 
border-r 
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
w-1/4 
px-1 
bg-tertiary 
text-white 
font-semibold
`)

const h2title = ctl(`
mb-2 
text-white 
font-semibold 
border-t-2
`)

export default {
  listChatrooms,
  linksChatrooms,
  chat,
  leftPanel,
  rightPanel,
  h2title
}