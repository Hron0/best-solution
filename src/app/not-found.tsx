import Link from 'next/link'

export default async function NotFound() {

    return (
        <div className={'w-full min-h-[100vh] overflow-hidden absolute top-1/4 flex flex-col items-center gap-2'}>
            <div className={'flex flex-row items-center gap-3'}>
                <h1 className={'text-2xl font-black text-red-700'}>404</h1>
                <h2 className={'text-xl font-black'}>Страница не найдена...</h2>
            </div>
            <Link href="/" className={'text-xl text-blue-700 font-black underline'}> На главную </Link>
        </div>
    )
}