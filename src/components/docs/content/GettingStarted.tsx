// src/components/docs/content/GettingStarted.tsx
import { CodeBlock } from '../CodeBlock';

export const GettingStarted = () => (
    <>
        <section id="pendahuluan" className="scroll-mt-24">
            <h1>Dokumentasi CloudNest</h1>
            <p>Selamat datang di dokumentasi resmi CloudNest. Di sini Anda akan menemukan semua yang Anda butuhkan untuk berintegrasi dengan platform kami. Panduan ini dirancang untuk developer dan mencakup semua dari panduan memulai cepat, instalasi SDK, hingga referensi API yang mendalam untuk setiap layanan yang kami tawarkan.</p>
        </section>
        
        <section id="api-keys" className="mt-12 scroll-mt-24">
            <h2>API Keys</h2>
            <p>Setiap proyek di CloudNest dilengkapi dengan sepasang kunci API yang dapat Anda temukan di Dashboard Pengaturan Proyek Anda. Kunci ini digunakan untuk mengautentikasi permintaan Anda ke API kami.</p>
            <ul>
                <li><strong>Public Key (anon key):</strong> Kunci ini aman untuk digunakan di sisi klien (browser, aplikasi mobile). Kunci ini memiliki akses terbatas sesuai dengan kebijakan Row Level Security (RLS) yang Anda atur.</li>
                <li><strong>Secret Key (service_role key):</strong> Kunci ini memiliki akses super admin dan dapat melewati semua kebijakan RLS. **JANGAN PERNAH** mengekspos kunci ini di sisi klien. Gunakan hanya di lingkungan server yang aman.</li>
            </ul>
        </section>

        <section id="instalasi-sdk" className="mt-12 scroll-mt-24">
            <h2>Instalasi SDK</h2>
            <p>Untuk mempermudah interaksi dengan API kami, kami sangat merekomendasikan penggunaan SDK resmi kami yang tersedia via npm. SDK ini menyediakan helper function yang memudahkan proses development.</p>
            <CodeBlock code="npm install cloudnest-sdk" language="bash" />
            <h3>Inisialisasi Client</h3>
            <p>Setelah instalasi, inisialisasi client di dalam proyek JavaScript/TypeScript Anda dengan menyertakan URL Proyek dan Public Key Anda.</p>
            <CodeBlock code={`import { createClient } from 'cloudnest-sdk'\n\nconst projectUrl = 'https://your-project.cloudnest.io'\nconst publicKey = 'YOUR_PUBLIC_KEY'\n\nexport const cloudnest = createClient(projectUrl, publicKey)`} language="javascript" />
        </section>
    </>
);