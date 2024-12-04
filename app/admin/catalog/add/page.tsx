import { Container } from "@/components/shared";
import { Input } from "@/components/ui";

const CategoryAdd = ({}) => {
    return (
        <>
            <Container className="mt-10">
                <div className="flex gap-[80px]">
                    <div>CategoryId - </div>
                    <Input type="text" defaultValue="id" disabled />
                </div>
                <div className="flex gap-[80px]">
                    <div>CategoryName - </div>
                    <Input type="text" defaultValue="name" />
                </div>
                <div className="flex gap-[80px]">
                    <div>CategoryParentId - </div>
                </div>
                <div className="flex gap-[80px]">
                    <div>CategorySlug - </div>
                    <Input type="text" defaultValue="{categories.slug}" />
                </div>
                <div className="flex gap-[80px]">
                    <div>CategoryDescription -</div>
                    <Input
                        type="text"
                        placeholder="{categories.description?.toString()}"
                    />
                </div>
                <div className="flex gap-[80px]">
                    <div>CategoryImage -</div>
                    <Input type="file" />
                </div>
            </Container>
            ;
        </>
    );
};

export default CategoryAdd;
