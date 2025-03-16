"use server"

import Link from "next/link";
import {getServerSession} from "@/lib/data/auth";

export default async function CreateBtn() {
    const session = await getServerSession()

    return (
        <>
            {session?.user.role == "ADMIN"
                &&
                <Link href={'/expertises/create'} className={'pr-3 text-lg font-black'}>
                    Создать
                </Link>
            }
        </>
    );
};