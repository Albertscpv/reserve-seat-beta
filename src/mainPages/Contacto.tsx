function Contacto (){
    return(
        <>
        <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff]/30 backdrop-blur-md  rounded-2xl shadow-xl text-black mt-4">
        <h1 className='font-bold text-white text-4xl'>Get  in Touch with us!</h1>
        <form action='' className='flex flex-col gap-6 justify-center my-6 w-[ '>
            <input className='py-4 pl-4 rounded-xl ' type='text' placeholder='Name' />
            <input className='py-4 pl-4 rounded-xl ' type='text' placeholder='Email'/>
            <input className='py-4 pl-4 rounded-xl ' type='text' placeholder='Message'/>
            <button className='bg-black rounded-xl text-white p-6 hover:bg-white hover:text-black transition duration-1000' type='submit'>Submit</button>
        </form>
        </div>
        </>
    )
} 

export default Contacto