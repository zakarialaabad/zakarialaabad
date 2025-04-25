import { SidebarProvider } from "@/components/ui/sidebar";
import { UserInfo } from "@/components/user-info";
import { NavMain } from "@/components/nav-main";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from "@/components/ui/dropdown-menu";
export default function Welc() {
  // تحديد عناصر القائمة التي ستظهر في NavMain
  const items = [
    { title: 'Home', href: '/home', icon: 'home-icon' },
    { title: 'About', href: '/about', icon: 'about-icon' },
    { title: 'Contact', href: '/contact', icon: 'contact-icon' }
  ];
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://static.vecteezy.com/ti/photos-gratuite/t2/43210041-portrait-de-une-sur-de-soi-jeune-noir-homme-pour-mode-de-vie-ou-mode-commercialisation-gratuit-photo.jpeg', // يمكنك تغيير الرابط إلى الصورة الحقيقية
};
  // تعريف دالة alert لعرض التنبيه
  const showAlert = () => {
    alert('Hello, welcome!');
  };

  return (
    <>
            <h3>Welcome, Monsieur!</h3>
    <SidebarProvider>
    <div className="p-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
          افتح القائمة
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => alert("عنصر 1")}>
            عنصر 1
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => alert("عنصر 2")}>
            عنصر 2
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>  
    </SidebarProvider>
     
        </>
  );
}
