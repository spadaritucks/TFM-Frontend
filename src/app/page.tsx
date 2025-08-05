import LoginForm from "@/components/forms/login-form/component";
import './styles.css'
import Image from "next/image";
import Logo from '../../public/logo-tfm.png'

export default async function Home() {
  return (
    <section className="form-section">
      <div className="form-image-container">
        <Image src={Logo} alt="" width={400} height={400} />
      </div>
      <div className="form-container">
        <h2>Login do Usuario</h2>
        <LoginForm />
      </div>
    </section>
  );
}
