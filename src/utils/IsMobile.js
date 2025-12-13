import useAppStore from "@/store/useAppStore";
const IsMobile = () => {
   
    window.addEventListener('resize', () => {
       useAppStore.setState({isMobile: window.innerWidth < 768});
    })

   useAppStore.setState({isMobile: window.innerWidth < 768});
   
}
IsMobile();
export default IsMobile;