export default function Header() {
    return(
        <section id="home" className="relative overflow-hidden border-b">
            <div className="container px-8 py-16">
                <div className="max-w-3xl">
                {/* <div className="mb-6">
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                    Frontend Developer Portfolio
                    </span>
                </div> */}

                <h1 className="mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    프론트엔드 개발자 양희승
                    </span>{" "}
                    포트폴리오입니다
                </h1>

                {/* <p className="text-muted-foreground">
                    끊임없이 도전해나가는 개발자입니다.
                </p> */}
                </div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2"></div>
        </section>
    )
}