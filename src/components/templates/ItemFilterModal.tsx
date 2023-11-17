import React, { useState,useContext,useMemo } from 'react'
import Modal from 'react-modal'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import { setFilter,selectFilterdSeries} from 'features/item/itemSlice'
import { Position } from 'types/itemTypes'
import { ItemContext } from 'pages'
import { setActiveModal, selectActiveModal } from 'features/app/appSlice'
import CheckBox from 'components/molecules/CheckBox'
import AppButton from 'components/Atoms/AppButton'
import { Series,Brand } from 'types/itemTypes'


interface CheckedItem {
  id:number,
  name:string,
}

//プランAとプランBを用意する

//処理の流れ
//アクセスしたらアイテムリスト、アイテムデータリストをreduxに格納(setItems,SSG,など)
//モーダルのチェックボックスで絞り込みをすると、state.filter~にそれぞれ選択された値だけが格納される(SetFilter)...
//元々全てのアイテムを格納しているfilterdItems.brand.nameと、state.filter.brandに格納された値が一致していたら、↓
//新たなfilterItemsにそれが格納される。つまり、filterItemsは、絞り込み前は全ての値、絞り込み後は絞り込みされた値だけが格納される。
//補足...filterは対象のデータを新しい配列に格納し、配列を作成する。some...条件を満たせるかどうかをbool値で返す
//型を指定せよ
const ItemFilterModal = () => {
  const dispatch = useDispatch()
  //モーダルコントロール
  const activeModal = useSelector(selectActiveModal)
  const filterdSeries = useSelector(selectFilterdSeries)
  const modalIsOpen = activeModal === 'ItemFilterModal'
  const { brands, series, positions } = useContext(ItemContext)
  const [selectedSeries, setSelectedSeries] = useState<Series[]>(filterdSeries || [])
  const [initialSelectedSeries, setInitialSelectedSeries] = useState<Series[]>([])
  console.log("itemfilterseries"+selectedSeries)
  useEffect(() => {
    setSelectedSeries(filterdSeries || []);
  }, [filterdSeries]);

  useEffect(() => {
    if (modalIsOpen) {
      setInitialSelectedSeries(selectedSeries);
      console.log("modalopenitemfilterseries/"+selectedSeries)
    }
  }, [modalIsOpen,])
  
  //絞り込み機能 //指定された項目が配列として格納される
  const [selectedBrand, setSelectedBrand] = useState<Brand[]>([])
  
  const [selectedPosition,setSelectedPosition] = useState<Position[]>([])

  //ブランドごとにシリーズをまとめる
  const seriesByBrand = useMemo(() => {
    return series.reduce((acc: Record<number, Series[]>, s) => {
      const brandId = s.brand.id;
      if (!acc[brandId]) {
        acc[brandId] = [];
      }
      acc[brandId] = [...acc[brandId], s];
      return acc;
    }, {});
  }, [series]);
  
  const selectAllSeries = () => {
    setSelectedSeries(series);
  };

  //絞り込みチェックボックス
  // const handleCheck = 
  // //セットするための関数がセッター
  //   (value: CheckedItem, setter: React.Dispatch<React.SetStateAction<CheckedItem[]>>) => 
  //     (e: React.ChangeEvent<HTMLInputElement>) => {
  //     //チェックがされているかどうかを確認
  //       const checked = e.target.checked
  //     //チェックされているなら、valueを追加、されていないなら、vがvalueと等しくない場合にtrueが帰る
  //     setter(prev => checked ? [...prev, value] : prev.filter(v => v !== value))
  //   }

  const handleCheck = (value: Series, setter: React.Dispatch<React.SetStateAction<Series[]>>) => 
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setter(prev => {
      if (checked) {
        return [...prev, value]; // チェックされた項目を追加
      } else {
        return prev.filter(v => v.id !== value.id); // チェックが外れた項目を除外
      }
    });
  };

  const closeModal = () => {
    dispatch(setActiveModal(null))
    setSelectedSeries(initialSelectedSeries)
  }

  const handleFilter = () => {
    closeModal()
    dispatch(setFilter({ 
      item_brand: selectedBrand, 
      item_series: selectedSeries, 
      item_position: selectedPosition
    }))
  }

  const clearAll = () => {
    setSelectedBrand([]);
    setSelectedSeries([]);
    setSelectedPosition([]);
  }
  return (
    <>
      <Head>
        <title>AceRacketRealm</title>
      </Head>
      <AppButton onClick={() => dispatch(setActiveModal('ItemFilterModal'))} text="Search" type="submit" color="green"/>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => dispatch(setActiveModal(null))} 
        ariaHideApp={false}
        contentLabel="Delete Confirmation"
        className="w-4/5 mt-20 mx-auto bg-white p-6 rounded" // Adjust width and styling here
        overlayClassName="fixed inset-0 bg-black bg-opacity-50" // Add overlay styling
        shouldCloseOnOverlayClick={false}
        shouldFocusAfterRender={true}
      >
        <div>
          <h2 className="text-lg font-bold">Filter Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map(brand => (
            <div key={brand.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">{brand.name}</h3>
              <div className="mt-2">
              {seriesByBrand[brand.id]?.map(s => (  // seriesByBrand[brand.id] が undefined の場合を考慮
                <CheckBox 
                  key={s.id} 
                  label={s.name} 
                  isChecked={selectedSeries.some(selected => selected.id === s.id)} 
                  onChange={handleCheck(s, setSelectedSeries)}
                />
              ))}
              </div>
            </div>
          ))}
          </div>
          <div>
            <AppButton text="絞り込む" onClick={handleFilter} type="button" color="blue" className="w-full"/>
          </div>
          <AppButton text="全て選択" onClick={selectAllSeries} type="button" color="blue" />
          <AppButton text="選択を全て外す" onClick={clearAll} type="button" color="blue" />
          <AppButton text="閉じる" onClick={closeModal} type="button" color="blue" />
          
        </div>
      </Modal>
    </>
  )
}

export default ItemFilterModal
