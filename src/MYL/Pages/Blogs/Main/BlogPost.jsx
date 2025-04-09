import React from 'react';
import ImageWithCaption from '../Components/ImageWithCaption';

const BlogPost = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center bg-white">
      <div className="flex flex-col justify-center items-center self-stretch px-20 py-32 w-full bg-zinc-50 max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/a090c51922bc6e1ef65fea586cfb717c78ca75d7855bed4d006e4eb7ff9302f8?apiKey=c3781a61f99f45d9979de044d3603935&"
          alt="Blog post main image"
          className="object-contain mb-0 w-full aspect-[1.91] max-w-[1035px] max-md:mb-2.5 max-md:max-w-full"
        />
      </div>
      <div className="flex overflow-hidden z-10 flex-col justify-center items-end px-20 py-9 mt-0 max-w-full leading-tight text-black bg-zinc-100 w-[686px] max-md:px-5">
        <div className="flex flex-col max-md:max-w-full">
          <div className="self-center text-sm text-center text-stone-900">
            23 November 2022
          </div>
          <h1 className="mt-4 mr-6 ml-7 text-3xl font-bold max-md:mx-2.5">
            Women's capsule wardrobe
          </h1>
          <div className="mt-2 text-sm max-md:max-w-full">
            A capsule wardrobe is a versatile, stylish and sustainable way to
            shop.
          </div>
        </div>
      </div>
      <article className="mt-11 text-base leading-6 text-stone-900 max-md:mt-10 max-md:max-w-full">
        <p>
          The realm of fashion just got a whole lot cooler—thanks to Meher
          Sheikh's all-new homegrown fashion endeavour–Sotbella. A renowned media
          personality and visionary entrepreneur, Sheikh is making waves on the
          fashion radar by embarking on a sustainable fashion landscape that does
          more than just deliver cult pieces to your doorstep. It is a lexicon of
          on-trend fashion sensibilities that empowers the women of today. As
          Sotbella ushers in a new era of conscious fashion, it is only fair that
          we, style connoisseurs, hop on this voguish, all-inclusive, eco-friendly
          bandwagon as well.
        </p>
        <p>
          The nomenclature 'Sotbella' itself delivers a profound message. In
          Swedish, 'Söt' translates to 'pretty' while 'bella' signifies a
          'beautiful woman'. At the core of Sotbella lies the commitment to being
          "luxuriously affordable". This unique blend caters to the discerning
          desires of modern women who seek both opulence and practicality.
          Transcending the norms of your typical fashion brand, Sotbella's
          philosophy is that fashion should be accessible to everyone without
          compromising on quality or style.
        </p>
      </article>
      <ImageWithCaption
        src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/a090c51922bc6e1ef65fea586cfb717c78ca75d7855bed4d006e4eb7ff9302f8?apiKey=c3781a61f99f45d9979de044d3603935&"
        alt="Fashion collection showcase"
        caption="A reflection of you"
      />
      <article className="mt-6 text-base leading-6 text-stone-900 max-md:max-w-full">
        <p>
          More than just its snazzy collection, Sotbella aims to be a movement
          that intends to set a new benchmark in the fashion industry by way of
          inclusivity and sustainability. In a world where self-expression is
          paramount, Sotbella emerges as an epitome of unapologetic style. Each
          outfit from the brand's collection is meticulously designed to empower
          wearers, encouraging them to embrace their idiosyncratic personalities.
        </p>
        <p>
          When asked about the launch and her vision, Meher said, "We are thrilled
          to have like-minded women join our community and look forward to seeing
          how they pull off their favourite Sotbella looks. I take great pride in
          introducing our fashion brand, which not only brings you stylish outfits
          but also champions inclusivity and empowers women to embrace their
          unique selves. Our goal is to revolutionise the women's apparel market
          by providing exceptional clothing options that are both affordable and
          accessible to everyone."
        </p>
      </article>
      <ImageWithCaption
        src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/a090c51922bc6e1ef65fea586cfb717c78ca75d7855bed4d006e4eb7ff9302f8?apiKey=c3781a61f99f45d9979de044d3603935&"
        alt="Diverse fashion models"
        caption="Diversity and sustainability at the forefront"
      />
      <article className="mt-6 text-base leading-6 text-stone-900 max-md:max-w-full">
        <p>
          Meher Sheikh's vision for Sotbella transcends mere aesthetics – it is
          about manifesting a community that celebrates diversity and
          inclusivity. In an era where sustainability is no longer an option but
          a necessity, Sotbella seems to take its obligation to the community
          and the environment seriously. The brand's dedication to sustainable
          practices is evident in its choice of materials, manufacturing
          processes, and packaging.
        </p>
        <p>
          "At Sotbella, we firmly believe that fashion encompasses more than
          just outward appearance; it's about cultivating inner confidence and
          well-being. That's why we remain dedicated to utilising sustainable
          materials and ethical manufacturing practices, ensuring that our
          clothing is not only fashionable but also environmentally conscious.
          Join our vibrant community and experience the empowering spirit and
          inclusivity that comes with wearing your distinct Sotbella ensemble,"
          says Sheikh.  Catering to people of all shapes and sizes, Sotbella's
          inclusive approach extends beyond their diverse range of clothing. It
          makes a strong case for championing body positivity and
          self-confidence all the while injecting your wardrobe with fail-proof
          style staples.  Check out the season's chicest clothing at
          <a
            href="https://www.sotbella.com/"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sotbella.com
          </a>
        </p>
      </article>
    </div>
  );
};

export default BlogPost;