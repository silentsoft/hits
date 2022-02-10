export default function Footer() {
    return (
        <div className="flex justify-center py-3 pt-10">
            <p className="text-sm leading-none text-black">Copyright &copy; {new Date().getFullYear()} silentsoft.org.</p>
        </div>
    );
}