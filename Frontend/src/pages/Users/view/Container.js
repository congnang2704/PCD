import React, { Suspense } from "react";
import IntroductionHome from "./Introduction/Introduction_home";
import DuAnTC from "./DuAnTC/duantc";
import { useNearScreen } from "./useNearScreen";

const StatisticSection = React.lazy(() => import("./StatisticTC/statistic"));
const DesignProcess = React.lazy(() => import("./Design/Design"));
const FeaturedProjects = React.lazy(() =>
  import("./FeaturedProjects/FeaturedProjects")
);
const SliderCMT = React.lazy(() => import("./Slider_CMT/Slider_CMT"));
const ContactForm = React.lazy(() => import("./Mail/ContactFormMail"));
const FAQComponent = React.lazy(() => import("./FAQComponent/FAQComponent"));
const Brands = React.lazy(() => import("./Brands/brands"));

export default React.memo(function Container() {
  const s1 = useNearScreen("700px"); // sau fold 1 chút
  const s2 = useNearScreen("700px");
  const s3 = useNearScreen("700px");
  const s4 = useNearScreen("700px");
  const s5 = useNearScreen("700px");
  const s6 = useNearScreen("700px");

  return (
    <div className="home-container">
      <IntroductionHome />
      <DuAnTC />

      {/* mốc để mount dần */}
      <div ref={s1.ref} />
      <Suspense fallback={null}>
        {s1.show ? <StatisticSection /> : null}
      </Suspense>

      <div ref={s2.ref} />
      <Suspense fallback={null}>{s2.show ? <DesignProcess /> : null}</Suspense>

      <div ref={s3.ref} />
      <Suspense fallback={null}>
        {s3.show ? <FeaturedProjects /> : null}
      </Suspense>

      <div ref={s4.ref} />
      <Suspense fallback={null}>{s4.show ? <SliderCMT /> : null}</Suspense>

      <div ref={s5.ref} />
      <Suspense fallback={null}>{s5.show ? <ContactForm /> : null}</Suspense>

      <div ref={s6.ref} />
      <Suspense fallback={null}>
        {s6.show ? (
          <>
            <FAQComponent />
            <Brands />
          </>
        ) : null}
      </Suspense>
    </div>
  );
});
