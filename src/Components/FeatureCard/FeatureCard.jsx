import Style from './FeatureCard.module.css'
function FeatureCard({features}){
    

        
   return(
    <section className={`row  ${Style.features}`}>
        {
            features.map((f, i)=>(
                <div key={i} className={`row  ${Style.feature}`}>
                    {f.icon}
                    <span>{f.desc}</span>
                </div>   
            ))
        }
    </section>
   );
}
export default FeatureCard;