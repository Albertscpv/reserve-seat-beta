const Home = () => {
    return(
        <>
            <div id="content-box" className="relative h-screen p-2">
                <div className="[grid-area:aside] bg-white p-12">Aside</div>
                <div className="[grid-area:main] bg-black p-12">Main</div>
            </div>
       </>
    )
} 

export default Home