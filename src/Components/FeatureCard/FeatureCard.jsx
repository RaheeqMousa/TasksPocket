import Style from './FeatureCard.module.css'
function FeatureCard({features}){
    

        
   return(
    <section className={`row flex-direction-column  ${Style.features}`} aria-labelledby='features-titles'>
        <h2 id='features-titles'>Features</h2>
        <div className={`row ${Style['feature-list']}`}>
        {
            features.map((f, i)=>(
                <div key={i} className={`row  ${Style.feature}`}>
                    <span aria-hidden="true">{f.icon}</span>
                    <h3>{f.desc}</h3>
                </div>   
            ))
        }
        </div>
    </section>
   );
}
export default FeatureCard;