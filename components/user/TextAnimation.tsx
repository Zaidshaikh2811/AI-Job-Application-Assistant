import { TextAnimate } from "@/components/magicui/text-animate";

export function TextAnimateDemo2({ children }: { children: string }) {
    return (
        <TextAnimate animation="blurIn" >
            {children}
        </TextAnimate>
    );
}
