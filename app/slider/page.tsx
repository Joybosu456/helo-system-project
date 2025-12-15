import Slider from "../components/Slider";

export default function Page() {
    return (
        <div className="min-h-screen bg-white p-10 space-y-8">
            <Slider />

            <Slider showValue={false} />

            <Slider disabled />

            <Slider />

            <Slider disabled />
        </div>
    );
}
