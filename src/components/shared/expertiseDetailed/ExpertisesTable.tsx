'use client'

import {DataTable} from "@/components/shared/expertiseDetailed/DataTableComps/DataTable";
import {columns} from "@/components/shared/expertiseDetailed/DataTableComps/columns";
import {useExpertisesList} from "@/lib/hooks/useExpertises";
import {ExpertisesTableSkeleton} from "@/components/shared/skeletons/ExpertisesTableSkeleton";


export function ExpertisesTable() {
    const {data, isLoading, isError} = useExpertisesList()

    return (
        <div className="container h-full py-4 lg:py-10">
            {isLoading ? (
                <ExpertisesTableSkeleton/>)
                : isError ? (
                    <h1 className={'font-bold text-black text-lg text-center'}>Ошибка загрузки...</h1>
                )
                : (<DataTable columns={columns} data={data}/>)
            }

        </div>
    );
}