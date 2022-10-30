
const NewInformation = ({image,title,category, alt}:itemProps) => {
  return (
    <>
        <h1 className="text-xl text-DarkBlueGray text-center mb-4">{title}</h1>
        <picture>
            <img className="w-full rounded-xl rotate-1" src={image} alt={alt} />
        </picture>
        <div className=" mt-4 text-BlueDarker">
            <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, fermentum egestas curabitur phasellus molestie. Ornare platea facilisis feugiat mauris sapien id lobortis, facilisi senectus taciti sed aliquet proin justo, volutpat interdum quis sociis conubia scelerisque. Sodales curae praesent sed vitae viverra aptent pulvinar primis quisque, nam lectus mollis diam hac congue fermentum laoreet etiam, porta litora habitasse curabitur malesuada ut potenti justo. Est justo turpis suscipit mattis dictumst aptent ultrices habitant a, potenti aliquam lectus pulvinar sem ut nullam hendrerit, id convallis erat fames lobortis euismod rutrum imperdiet. Vehicula eros nunc cubilia hendrerit potenti vulputate vestibulum curae, nam elementum mus euismod dis sollicitudin taciti nostra class, laoreet ridiculus bibendum dictumst himenaeos mattis maecenas.
            Justo maecenas laoreet lacinia vitae sem nec urna dui libero cum, congue litora sollicitudin tincidunt vehicula taciti netus commodo volutpat nam, ligula pretium potenti cubilia augue aptent lobortis cras iaculis. Inceptos nostra pellentesque egestas nisi curae ridiculus facilisi neque sociis, hac auctor mauris senectus quisque nam aliquet tristique. Scelerisque posuere potenti turpis porttitor sodales ullamcorper vehicula congue pretium ut, placerat cras varius cubilia aliquam nascetur eget fringilla natoque. Nibh sodales risus aptent commodo metus, duis tincidunt varius class tempus facilisis, felis ad suscipit nunc.
            Hendrerit mus bibendum potenti blandit primis luctus dignissim, sociosqu dui congue mollis erat feugiat, sagittis porttitor inceptos faucibus taciti lacus. Congue vestibulum vivamus ultrices malesuada dapibus neque potenti luctus, felis cursus dignissim velit nisl primis aenean rutrum parturient, faucibus donec etiam sollicitudin eros sociis sed. Torquent ut inceptos sociosqu integer diam sociis quisque aliquet ultricies nam velit, est felis magna condimentum sed morbi id parturient imperdiet.
            </p>
        </div>
        <div className="bg-Lavender-Blue w-fit p-2 rounded-lg -rotate-6 mt-3">
            <p>{category}</p>
        </div>
    </>
  )
}

export default NewInformation