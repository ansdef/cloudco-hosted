'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import EquipmentCard from '@/components/EquipmentCard'
import styles from './EquipmentCatalog.module.css'
import { Equipment } from '@/models/Equipment'
import { getEquipmentList } from '@/services/equipmentService'

export default function EquipmentCatalog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [searchQuery, setSearchQuery] = useState('')
  const [equipmentItems, setEquipmentItems] = useState<Equipment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const filteredItems = equipmentItems.filter(item => {
    if (type && item.type.toLowerCase() !== type.toLowerCase()) {
      return false
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query)
      )
    }
    return true
  })

  const handleEquipmentClick = (id: string) => {
    router.push(`/equipment/${id}`)
  }

  useEffect(() => {
    const getEquipment = async () => {
      setIsLoading(true);
      const equipmentList = await getEquipmentList()

      setIsLoading(false);
      setEquipmentItems(equipmentList)
    }

    getEquipment()
  }, []);

  return (
    <div className={styles.container}>
      <Header showBack />
      <SearchBar
        placeholder="Поиск оборудования"
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className={styles.equipmentList}>
        {isLoading ?
          <div className="bigLoader"></div> :
          filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <EquipmentCard
                  key={item.id}
                  equipment={item}
                  onClick={() => handleEquipmentClick(item.id)}
                />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>Оборудование не найдено</p>
              </div>
            )
        }
      </div>
    </div>
  )
}
