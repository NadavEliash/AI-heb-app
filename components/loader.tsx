export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <img src="https://www.svgrepo.com/show/332441/loading.svg" alt="loading..." />
            </div>
            <div className="w-8 h-8 absolute animate-spin duration-700 mb-10">
                <img src="https://www.svgrepo.com/show/361231/loading.svg" alt="loading..." />
            </div>
            <p className="text-muted-foreground">
                המחשב חושב...
            </p>
        </div>
    )
}