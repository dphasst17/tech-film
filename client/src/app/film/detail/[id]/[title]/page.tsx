import { Metadata } from 'next';
import IndexDetail from '.'
export async function generateMetadata({ params }: { params: { title: string } }): Promise<Metadata> {
    const { title } = params;
    return {
        title: `${title.split("%20").join(" ")}`,
        description: "Next Js Film",
    };
}
const DetailFilm = () => {

    return <IndexDetail />
}

export default DetailFilm