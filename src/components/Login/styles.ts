import ctl from "helpers/ctl";

const input = ctl(`
appearance-none 
block 
w-full
mb-3
py-3 
px-4 
bg-gray-100 
border 
border-gray-100
placeholder-gray-400
rounded 
leading-tight 
outline-none
focus:outline-none
focus:bg-white
focus:ring-primary
focus:border-primary
`);

const label = ctl(`
block 
mb-2
font-bold 
text-sm 
`);

const labelSignUp = ctl(`
block 
mb-2
font-bold
uppercase 
tracking-wide 
text-xs
`);

export default {
  input,
  label,
  labelSignUp
}