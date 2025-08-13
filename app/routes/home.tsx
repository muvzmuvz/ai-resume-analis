import type {Route} from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";


export function meta({}: Route.MetaArgs) {
    return [
        {title: "Резюме анализатор"},
        {name: "description", content: "Умный помощник"},
    ];
}

export default function Home() {
    const {auth} = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {

        if (!auth.isAuthenticated) {
            navigate('/auth?next=/')
        }

    }, [auth.isAuthenticated])

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar/>
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Отслеживай свои приложения и резюме</h1>
                    <h2>Получи feedback от AI</h2>
                </div>

                {resumes.length > 0 && (
                    <div className={"resumes-section"}>
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume}/>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
