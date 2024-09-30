function Contacto (){
    return(
        <>
        <h1 className='font-bold text-4xl'>Get  in Touch with us!</h1>
        <div className='flex w-[100%] place-content-center text-black'>
        <form action='' className='flex flex-col gap-6 justify-center my-6 w-[50%] '>
            <input className='py-4 pl-4 rounded-xl ' type='text' placeholder='Name' />
            <input className='py-4 pl-4 rounded-xl ' type='text' placeholder='Email'/>
            <input className='py-4 pl-4 rounded-xl ' type='text' placeholder='Message'/>
            <button className='bg-sky-200 rounded-xl text-black p-6' type='submit'>Submit</button>
        </form>
        </div>
        </>
    )
} 

export default Contacto