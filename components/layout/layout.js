import MainHeader from "./main-header";

export default function Layout(props) {
  return (
    <>
      <MainHeader />
      <main style={{minHeight:"400px"}}>{props.children}</main>
    </>
  );
}
