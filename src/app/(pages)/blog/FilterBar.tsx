"use client"

import {useState, useEffect} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Search, CalendarIcon, X} from "lucide-react"
import {format} from "date-fns"
import {ru} from "date-fns/locale"
import {cn} from "@/lib/utils"

interface FilterBarProps {
    onSearch: (query: string, startDate?: string, endDate?: string) => void
    initialSearch?: string
    initialStartDate?: string
    initialEndDate?: string
}

export function SearchBar({onSearch, initialSearch = "", initialStartDate, initialEndDate}: FilterBarProps) {
    const [searchQuery, setSearchQuery] = useState(initialSearch)
    const [startDate, setStartDate] = useState<Date | undefined>(
        initialStartDate ? new Date(initialStartDate) : undefined,
    )
    const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate ? new Date(initialEndDate) : undefined)

    useEffect(() => {
        if (initialSearch || initialStartDate || initialEndDate) {
            handleApplyFilters()
        }
    }, [initialSearch, initialStartDate, initialEndDate])

    const handleApplyFilters = () => {
        onSearch(searchQuery, startDate ? startDate.toISOString() : undefined, endDate ? endDate.toISOString() : undefined)
    }

    const handleClearFilters = () => {
        setSearchQuery("")
        setStartDate(undefined)
        setEndDate(undefined)
        onSearch("", undefined, undefined)
    }

    const hasActiveFilters = !!searchQuery || !!startDate || !!endDate

    return (
        <div className="w-full max-w-3xl space-y-2">
            <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"/>
                <Input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-20"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleApplyFilters()
                        }
                    }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <CalendarIcon className="h-4 w-4"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-md w-64 bg-white">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Дата от:</p>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {startDate ? format(startDate, "PPP", {locale: ru}) :
                                                    <span>Выберите дату</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={startDate} onSelect={setStartDate}
                                                      initialFocus/>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Дата до:</p>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {endDate ? format(endDate, "PPP", {locale: ru}) :
                                                    <span>Выберите дату</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={endDate} onSelect={setEndDate}
                                                      initialFocus/>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <Button className="mt-auto" onClick={handleApplyFilters}>
                                    Применить
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {hasActiveFilters && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"
                                onClick={handleClearFilters}>
                            <X className="h-4 w-4"/>
                        </Button>
                    )}
                </div>
            </div>

        </div>
    )
}

