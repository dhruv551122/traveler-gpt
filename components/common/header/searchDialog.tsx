import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn, formateDate } from "@/lib/utils";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import {
    ChangeEvent,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import Link from "next/link";
import { SanityImage } from "../sanityImage";
import { BlogsByTitleSearchResult, SettingsQueryResult } from "@/sanity.types";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { blogsByTitleSearch } from "@/sanity/lib/query";

const PAGE_SIZE = 10

const SearchDialog = ({
    menuOpen,
    setMenuOpen,
    tags,
    isMobile
}: {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<SetStateAction<boolean>>;
    tags: NonNullable<SettingsQueryResult>['blogTags'];
    isMobile: boolean;
}) => {
    const [inputText, setInputText] = useState<string>("");
    const [isSearchMounted, setIsSearchMounted] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [searchResult, setSearchResult] = useState<NonNullable<BlogsByTitleSearchResult>>([])
    const [currentPage, setCurrentPage] = useState<number>(1)


    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
    const searchDialogTimeRef = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        if (typeof document !== "undefined") {
            if (menuOpen || isSearchMounted) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        }
    }, [menuOpen, isSearchMounted]);

    useEffect(() => {
        if (searchDialogTimeRef.current) {
            clearTimeout(searchDialogTimeRef.current);
        }
        if (isSearchMounted) {
            searchDialogTimeRef.current = setTimeout(() => setIsSearchOpen(true), 10);
        } else {
            searchDialogTimeRef.current = setTimeout(() => setIsSearchOpen(false));
        }
    }, [isSearchMounted]);

    useEffect(() => {
        client.fetch(blogsByTitleSearch, { searchPrefix: `*${inputText.trim()}*`, selectedTags, start: (currentPage - 1) * PAGE_SIZE, end: currentPage * PAGE_SIZE })
            .then(blogs => setSearchResult(blogs ?? []))
            .catch(error => {
                console.error(error)
                setSearchResult([])
            })
    }, [inputText, currentPage, selectedTags])

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const value = e.target.value;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (!value.trim()) {
            setInputText("");
            return;
        }

        timerRef.current = setTimeout(() => setInputText(e.target.value), 300);
    };

    return (
        <Dialog
            onOpenChange={setIsSearchMounted}
            open={isSearchMounted}
            modal={false}
        >
            <DialogTrigger
                onClick={() => {
                    if (menuOpen) {
                        setMenuOpen(false);
                    }
                }}
            >
                <SearchIcon className={cn("text-gunmetal-black duration-300 cursor-pointer", menuOpen && "text-white")} />
            </DialogTrigger>
            <DialogContent
                onCloseAutoFocus={() => {
                    setInputText("");
                }}
                showCloseButton={false}
                className={cn(
                    "text-tuatara top-0 z-1001 md:z-50 h-0 p-0 md:p-6 translate-y-0 backdrop-blur-xs rounded-none shadow-none border-none sm:max-w-none max-w-none data-[state=open]:h-screen w-screen flex justify-center bg-black/50",
                    isMobile && "rounded-none",
                )}
            >
                <div
                    className={cn(
                        "p-4 bg-white -translate-y-full w-full md:rounded-lg shadow-lg md:w-[80%] py-6 md:p-6 max-h-screen md:h-fit md:mt-20 transition-transform ease-in-out duration-300 flex flex-col gap-4",
                        isSearchOpen && "translate-y-0",
                    )}
                >
                    <DialogHeader className="gap-4 text-left h-fit">
                        <div className="pb-2">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="subtitle-2! text-deep-bright-red">
                                    Search a Topic
                                </DialogTitle>
                                <DialogClose className="cursor-pointer" asChild>
                                    <X className="duration-300 hover:text-deep-bright-red" />
                                </DialogClose>
                            </div>

                            <DialogDescription className="text-gray-500 description">
                                Search articles, topics, or keywords to quickly find what you’re
                                looking for.
                            </DialogDescription>
                        </div>
                        <div className="relative">
                            <SearchIcon
                                size={18}
                                className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2"
                            />
                            <Input
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Write here...."
                                className="shadow-none description outline-none p-0 pl-8 py-3 h-auto"
                            />
                        </div>

                    </DialogHeader>
                    <div className="flex flex-col gap-8 overflow-y-scroll w-full max-h-full custom-scrollbar md:min-h-80 md:max-h-80 no-scrollbar">
                        {tags.length > 0 && <div className="flex gap-2 flex-wrap items-center">
                            {tags.map(tag => <span key={tag._id} role="button" onClick={() => {
                                return setSelectedTags(prev => {
                                    if (selectedTags.includes(tag._id)) {
                                        return prev.filter(tagId => tagId !== tag._id)
                                    } else {
                                        return [...prev, tag._id]
                                    }
                                })
                            }
                            } className={cn("px-3 py-2 rounded-[5px] duration-300 border border-gunmetal-black hover:border-deep-bright-red hover:bg-deep-bright-red cursor-pointer hover:text-white", selectedTags.includes(tag._id) && "bg-deep-bright-red border-deep-bright-red text-white")}>{tag.label}</span>)}
                        </div>}
                        {searchResult.length > 0 ?
                            <div className="flex flex-col  gap-4">
                                {searchResult.map((blog, index) => (
                                    <DialogClose key={blog._id} asChild>
                                        <Link
                                            key={blog._id}
                                            href={`/blogs/${blog.slug}`}
                                            className={cn(
                                                "flex flex-col sm:flex-row group gap-4 pb-4",
                                                searchResult.length - 1 !== index &&
                                                "border-b border-gray-300",
                                            )}
                                        >
                                            <SanityImage
                                                src={blog.heroImage}
                                                alt={blog.heroImage.asset.altText}
                                                width={1000}
                                                height={1000}
                                                className="object-cover w-full h-auto max-w-75 aspect-square rounded-xl"
                                            />
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-wrap items-center gap-2 note">{blog.tags.map(tag => <span key={tag._id} className="py-1 px-3 rounded-[5px] border border-stone-500 shadow-inner">{tag.label}</span>)}
                                                    • <span className="text-stone-500">{formateDate(blog.uplodedAt || blog._updatedAt)}</span>
                                                </div>
                                                <h4 className="subtitle-2">{blog.title}</h4>
                                            </div>
                                        </Link>
                                    </DialogClose>
                                ))}
                                {searchResult.length > currentPage * PAGE_SIZE && <button className="flex items-center gap-2" onClick={() => {
                                    if (searchResult.length > currentPage * PAGE_SIZE) {
                                        setCurrentPage(prev => prev + 1)
                                    }
                                }}><span>Load More</span><ChevronDown /></button>}
                            </div>
                            : <div className="h-full md:max-h-80 md:min-h-80 flex flex-col items-center justify-center">
                                <Image src='/not-found.gif' alt="not-found" width={1000} height={1000} className="w-full h-auto object-contain max-h-50" />
                                <p>No match found.</p>
                            </div>
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
