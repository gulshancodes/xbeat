import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';


const App = () => {
  return (
    <>
      <CommonProvider>
        <CartProvider>
          <Header />
          <RouterRoutes />
          <Footer />
          <BackTop />
        </CartProvider>
      </CommonProvider>
    </>
  );
};

export default App;
