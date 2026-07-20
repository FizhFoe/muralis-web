export default function Login() {
    return (
        <section id="login" className="login-wrapper flex flex-col items-center justify-center py-4 px-4 md:px-8 lg:min-h-screen">
            <div className="max-w-md lg:ml-auto w-full">
                <h1 className="text-3xl font-bold mb-10">Iniciar Sessão</h1>

                <form className="space-y-6">
                    <div>
                        <label for="email" className="mb-2 font-medium text-sm inline-block">Email</label>
                        <input type="email" name="email" id="email" required className="px-3 py-2.5 text-sm rounded-md bg-white w-full
                        -outline-offset-1 outline-slate-300" />
                    </div>
                    <div>
                        <label for="password" className="mb-2 font-medium text-sm inline-block">Password</label>
                        <input type="password" name="password" id="password" required className="px-3 py-2.5 text-sm rounded-md bg-white w-full
                        -outline-offset-1 outline-slate-300" />
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center bg-gray-600 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">Entrar</button>
                    </div>
                </form>
            </div>
        </section>
    );
}