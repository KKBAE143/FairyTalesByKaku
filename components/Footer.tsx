import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background shadow-md mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FairyTalesByKaku</h3>
            <p className="text-muted-foreground">Capturing life's precious moments with creativity and passion.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/services" className="text-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/about" className="text-foreground hover:text-primary">About</Link></li>
              <li><Link href="/gallery" className="text-foreground hover:text-primary">Gallery</Link></li>
              <li><Link href="/contact" className="text-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-muted-foreground">Email: Kakufotography@gmail.com</p>
            <p className="text-muted-foreground">Phone: 8008484321</p>
            <p className="text-muted-foreground"><a href="https://www.instagram.com/fairytalesbykaku">Instagram: fairytalesbykaku</a></p>

          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>&copy; 2024 FairyTalesByKaku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;