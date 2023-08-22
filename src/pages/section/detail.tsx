import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react"
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import { fetchArticlesBySectionId, fetchArticlesByCategoryId, fetchCategoryBySectionId, fetchSection } from "@/api/blog/blog"
import { Article, CategoryItem, SectionInfo } from "@/api/blog";

interface Category {
    id: number;
    title: string;
    numArticle: number;
}

const Detail = () => {
    const { sectionId } = useParams();
    const navigate = useNavigate();

    // ================================
    // ============ States ============
    // ================================
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [sectionInfo, setSectionInfo] = useState<SectionInfo>({
        title: "",
        description: "",
        maintainers: "",
        numArticle: 0,
        categories: null,
    });

    // ==============================
    // ============ APIs ============
    // ==============================
    const getCategories = () => {
        fetchCategoryBySectionId(sectionId).then(res => {
            setCategories(res.data);
        })
    }
    const getSection = () => {
        fetchSection(sectionId).then(res => {
            const data = res.data;
            setSectionInfo(prevState => {
                return {
                    ...prevState,
                    title: data.title,
                    description: data.description,
                    maintainers: data.maintainers,
                    numArticle: data.numArticle,
                    categories: null,
                }
            });
        })
    }
    const getAllArticles = () => {
        fetchArticlesBySectionId(sectionId).then(res => {
            setArticles(res.data)
        });
    }

    // ==============================
    // ========== Eventss ===========
    // ==============================
    const createArticle = () => {
        // redirect to article creating page
        navigate("/article/create");
    }
    const chooseCategory = (categoryId: string) => {
        fetchArticlesByCategoryId(categoryId).then(res => {
            setArticles(res.data);
        });
    }

    const numResults = 99999;
    useEffect(() => {
        getSection();
        getCategories();
        getAllArticles();
    }, [])
    return <>
        <div className="mt-5">
            <h1 className="text-2xl font-semibold leading-none tracking-tight text-blue-800">
                {`< ${sectionInfo.title} >`}
                <span className="ml-3 text-base leading-none tracking-tight text-gray-400">
                    {sectionInfo.numArticle} result{sectionInfo.numArticle > 1 ? "s" : ""}
                </span>
            </h1>
            <div className="flex justify-between mt-5">
                <Button
                    borderRadius="0"
                    variant="outline"
                    size="sm"
                    onClick={() => createArticle()}
                >
                    <PlusIcon className="h-4 w-4" />&nbsp;
                    <span className="text-gray-600">发帖</span>
                </Button>
                <div className="space-x-2">
                    <span className="text-sm font-bold">1 / 5</span>
                    <Button size="sm" variant="outline" >
                        <ArrowLeftIcon className="font-bold h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                        <ArrowRightIcon className="font-bold h-3 w-3" />
                    </Button>
                </div>
            </div>
            <ul className="flex flex-wrap  gap-2 mt-3 text-xs">
                <li className="border-2 p-1 hover:bg-gray-200" onClick={() => getAllArticles()}>全部</li>
                {
                    (categories.length) > 0
                        ? categories.map(item => {
                            return <li
                                className="border-2 p-1 hover:bg-gray-200 hover:cursor-pointer"
                                key={item.id}
                                onClick={() => chooseCategory(item.id.toString())}
                            >
                                ◾ {item.title}<em className="text-red-600">&nbsp;({item.numArticle})</em>
                            </li>
                        })
                        : <></>
                }
            </ul>
            {/** List Component **/}
            <div className="mt-2">
                {/** Show Menu **/}
                <div className="bg-gray-100 p-1 space-x-2 text-xs mb-1">
                    <span className="cursor-pointer">最新</span>
                    <span className="cursor-pointer">热门</span>
                    <span className="cursor-pointer">精华</span>
                </div>
                {
                    true
                        ? <table className="table-fixed w-full border-none">{/** List **/}
                            <tbody>
                                {
                                    articles.map(item => {
                                        return <tr className="hover:bg-gray-100" key={item.id}>
                                            <td>
                                                <Link to="/" className="mr-2 text-sm text-blue-800">
                                                    [原创工具]
                                                </Link>
                                                <Link to="/article/1" className="text-sm">
                                                    ahahahahahahahhhh...
                                                </Link>
                                            </td>
                                            <td className="w-1/12 text-sm">🔥1K</td>
                                            <td className="w-1/12 text-xs">
                                                <Link to="">illusion</Link><br />
                                                <span className="text-gray-600">2023-04-07</span>
                                            </td>
                                        </tr>
                                    })
                                }
                                {/*<tr className="hover:bg-gray-100">
                                    <td>
                                        <span className="mr-2 text-sm text-blue-800">
                                            [原创工具]
                                        </span>
                                        <Link to="" className="text-sm">ahahahahahahahhhh...</Link>
                                    </td>
                                    <td className="w-1/12 text-sm">🔥549</td>
                                    <td className="w-1/12 text-xs">
                                        illusion<br />
                                        2023-04-07
                                    </td>
                                </tr>*/}
                            </tbody>
                        </table>
                        : <div className="flex justify-center my-2">{/** Empty Text **/}
                            <span className="text-sm">No record</span>
                        </div>
                }
            </div>
        </div>
    </>
}

export default Detail;
