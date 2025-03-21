import LoginExample from '@/components/LoginExample'
import { CookiesProvider } from "next-client-cookies/server";
export const metadata = {
  title: 'Sign In',
}

export default function Login() {


  return (
    <CookiesProvider>
      <LoginExample />
    </CookiesProvider>
    // <SlimLayout>
    //   <div className="flex">
    //     <Link href="/" aria-label="Home">
    //       <Logo className="h-10 w-auto" />
    //     </Link>
    //   </div>
    //   <h2 className="mt-20 text-lg font-semibold text-gray-900">
    //     Sign in to your account
    //   </h2>
    //   <p className="mt-2 text-sm text-gray-700">
    //     Don’t have an account?{' '}
    //     <Link
    //       href="/signup"
    //       className="font-medium text-blue-600 hover:underline"
    //     >
    //       Sign up
    //     </Link>{' '}
    //     for a free trial.
    //   </p>
    //   <form action={SignUp} className="mt-10 grid grid-cols-1 gap-y-8">
    //     <TextField
    //       label="Email address"
    //       name="email"
    //       type="email"
    //       autoComplete="email"
    //       required
    //     />
    //     <TextField
    //       label="Password"
    //       name="password"
    //       type="password"
    //       autoComplete="current-password"
    //       required
    //     />
    //     <div>
    //       <Button type="submit" variant="solid" color="blue" className="w-full">
    //         <span>
    //           Sign in <span aria-hidden="true">&rarr;</span>
    //         </span>
    //       </Button>
    //     </div>
    //   </form>
    // </SlimLayout>
  )
}
