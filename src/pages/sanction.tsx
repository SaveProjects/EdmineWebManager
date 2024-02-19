import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { UserSanction } from "@/types/data";
import styles from '../styles/sanction.module.scss';

function formatDate(dateString: string | undefined): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    // @ts-ignore
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
}

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sanctions, setSanctions] = useState<UserSanction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const sanctionsPerPage = 5;

    const fetchSanctions = async () => {
        if (!session?.user?.id) return null;

        const response = await fetch("/api/getsanction", {
            method: "POST",
            body: JSON.stringify({ id: session?.user?.id }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        setSanctions(data.sanctions);
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchSanctions();
        }
    }, [status]);

    // Logic to get current sanctions
    const indexOfLastSanction = currentPage * sanctionsPerPage;
    const indexOfFirstSanction = indexOfLastSanction - sanctionsPerPage;
    const currentSanctions = sanctions.slice(indexOfFirstSanction, indexOfLastSanction);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (status === "authenticated") {
        return (
            <div>
                <h1>Sanctions :</h1>
                {currentSanctions.map((item: UserSanction, i) => {
                    const pseudo = item.name;
                    const reason = item.reason;
                    const type = item.type;
                    const date = item.type === "mute" ? item.mute_date : item.kick_date;
                    const formattedDate = formatDate(date);
                    return (
                        <div key={i}>
                            <span>Pseudo: {pseudo}</span>
                            <br />
                            <span>Raison: {reason}</span>
                            <br />
                            <span>Date: {formattedDate}</span>
                            <br />
                            <span>Type: {type}</span>
                            <br />
                            <br />
                        </div>
                    );
                })}
                {/* Pagination */}
                <ul className={styles.pagination}>
                    {Array.from({length: Math.ceil(sanctions.length / sanctionsPerPage)}).map((_, index) => (
                        <li key={index}
                            className={`${styles.pageItem} ${currentPage === index + 1 ? styles.active : ''}`}>
                            <button onClick={() => paginate(index + 1)} className={styles.pageLink}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (status === "loading") {
        return <div>Loading...</div>;
    } else if (status === "unauthenticated") {
        return <p>Access Denied</p>;
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {getSession} = await import("next-auth/react");
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    } else {
        let rank = session?.user?.modulable_rank;
        if (rank < 13) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
    }

    return {
        props: { session },
    };
}
