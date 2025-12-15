import Slider from "../components/Slider";

export default function Page() {
    return (
        <div className="min-h-screen bg-white p-10 space-y-8">
            {/* Active slider */}
            <Slider />

            {/* Slider without tooltip */}
            <Slider showValue={false} />

            {/* Disabled slider */}
            <Slider disabled />

            {/* Another active */}
            <Slider />

            {/* Disabled range style */}
            <Slider disabled />
        </div>
    );
}
