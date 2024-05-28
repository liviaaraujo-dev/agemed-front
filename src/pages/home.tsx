export function HomePage(){
    return(
        <div className="min-h-screen h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/images/bg.jpg')"}}>
            <div className="w-1/3 bg-black bg-opacity-50 p-10 text-white rounded-lg">
                <h1>Home</h1>
            </div>
        </div>
    );
}
